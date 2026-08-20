"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  RiAddLine as Plus,
  RiUploadLine as Upload,
  RiCloseCircleLine as XCircle,
} from "react-icons/ri";
import { useState, useTransition } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import Image from "next/image";
import TiptapEditor from "@/components/dashboard/TipTapEditor";
import { createActivity } from "@/app/actions/activity.action";
import { Spinner } from "@/components/ui/spinner";
import { CreateActivitySchema } from "@/lib/validators/activity.validator";

export default function CreateActivity() {
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [isPending, startTransition] = useTransition();

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setPicture(picture);
    setPictureUrl(URL.createObjectURL(picture!));
  }

  function removePicture() {
    setPicture(undefined);
    setPictureUrl(undefined);
  }

  const form = useForm<z.infer<typeof CreateActivitySchema>>({
    resolver: zodResolver(CreateActivitySchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreateActivitySchema>) {
    if (!picture) {
      toast.error("Foto harus diinput");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("image", picture);

    startTransition(async () => {
      try {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const category = formData.get("category") as string;
        const image = formData.get("image") as File;

        await createActivity({
          activity: {
            title: title,
            content: content,
            slug: slugify(title, { lower: true }),
            category,
          },
          image,
        });
        toast.success("Activity created!");
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <header className="items-center justify-between lg:flex">
            <div className="">
              <h1 className="text-primary text-2xl font-medium">
                Create New Activity
              </h1>
              <p className="mt-1 text-gray-400">
                Create a new activity for displaying to our clients
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-4 lg:mt-0 lg:justify-start">
              <Button variant="default" type="submit" className="gap-2">
                <Plus />
                Submit
              </Button>
            </div>
          </header>
          <div className="flex flex-col flex-wrap gap-6 lg:flex-row">
            <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6 lg:flex-[4]">
              <h2 className="text-xl font-medium">Activity Details</h2>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Title</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Lift-Up Monitor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Instalasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Content</FormLabel>
                    <FormControl>
                      <TiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6 lg:flex-[3]">
              <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
                <h2 className="text-xl font-medium">Foto Produk</h2>
                {pictureUrl ? (
                  <div className="relative flex h-60 w-full flex-col rounded-md border-[3px] border-dashed">
                    <div className="relative h-5/6 w-full items-center justify-center p-1">
                      <Image
                        src={pictureUrl}
                        className="border-2 border-double object-contain object-center p-1"
                        alt=""
                        fill
                      />
                    </div>
                    <div
                      onClick={removePicture}
                      className="flex w-full cursor-pointer items-center justify-end gap-2 p-2 text-red-400"
                    >
                      <XCircle size={18} />
                      <span className="text-lg font-medium">Hapus File</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed">
                    <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-md">
                      <Upload size={28} strokeWidth={1.75} />
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-2 text-center">
                      <Button
                        type="button"
                        className="text-primary max-w-fit bg-sky-100"
                      >
                        Upload Image
                        <FormLabel className="absolute top-0 left-0 h-full w-full border opacity-0">
                          {'""'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="absolute top-0 left-0 opacity-0"
                            type="file"
                            accept="image/*"
                            onChange={handlePicture}
                          />
                        </FormControl>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="box-shadow flex w-full flex-col items-center justify-between gap-3 rounded-md bg-white p-6">
                <Button
                  disabled={isPending || !form.formState.isValid}
                  className="flex w-full items-center gap-3"
                >
                  {isPending ? <Spinner /> : "Tambahkan"}
                </Button>
                <div className="text-center">
                  <div className="text-primary lg:text-lg">
                    Make sure data is correctly filled
                  </div>
                  <small className="text-xs lg:text-sm">
                    You can modify this data later*
                  </small>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
