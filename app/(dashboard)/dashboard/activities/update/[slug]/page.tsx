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
import { Plus, Upload, XCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import TiptapEditor from "@/components/dashboard/TipTapEditor";
import { Spinner } from "@/components/ui/spinner";
import {
  getActivityBySlug,
  updateActivity,
} from "@/app/actions/activity.action";
import { ActivityType } from "@/lib/validators/activity.validator";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export default function UpdateActivity() {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const [picture, setPicture] = useState<File | undefined>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const { slug } = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Fetch activity
  useEffect(() => {
    async function fetchActivity() {
      if (!slug) return;
      try {
        const data = await getActivityBySlug(slug as string);
        if (!data) return;
        setActivity(data);

        // Set form values
        form.reset({ title: data.title, content: data.content });

        // Handle existing image
        if (data.image) {
          setPictureUrl(data.image.url);
          const res = await fetch(data.image.url);
          const blob = await res.blob();
          setPicture(new File([blob], "image.jpg", { type: blob.type }));
        }
      } catch (err) {
        toast.error("Failed to load activity");
      }
    }
    fetchActivity();
  }, [slug, form]);

  // Picture handlers
  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPicture(file);
    setPictureUrl(URL.createObjectURL(file));
  }

  function removePicture() {
    setPicture(undefined);
    setPictureUrl(undefined);
  }

  // Form submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!picture) {
      toast.error("Foto harus diinput");
      return;
    }

    startTransition(async () => {
      try {
        await updateActivity(activity?.id as number, {
          activity: {
            title: values.title,
            content: values.content,
            slug: slugify(values.title, { lower: true }),
            category: "all",
          },
          image: picture,
        });
        toast.success("Activity updated!");
        router.push("/dashboard/activities"); // Redirect after update
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
            <div>
              <h1 className="text-primary text-2xl font-medium">
                Update Activity
              </h1>
              <p className="mt-1 text-gray-400">
                Update an existing activity for displaying to our clients
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-4 lg:mt-0 lg:justify-start">
              <Button
                variant="secondary"
                type="button"
                onClick={() => router.back()}
              >
                Discard
              </Button>
              <Button variant="default" type="submit" className="gap-2">
                <Plus />
                Submit
              </Button>
            </div>
          </header>

          <div className="flex flex-col flex-wrap gap-6 lg:flex-row">
            {/* Details */}
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

            {/* Picture */}
            <div className="space-y-6 lg:flex-[3]">
              <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
                <h2 className="text-xl font-medium">Activity Picture</h2>

                {pictureUrl ? (
                  <div className="relative flex h-60 w-full flex-col rounded-md border-[3px] border-dashed">
                    <div className="relative h-5/6 w-full p-1">
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
                      <span className="text-lg font-medium">
                        Remove Picture
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed">
                    <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-md">
                      <Upload size={28} strokeWidth={1.75} />
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-2 text-center">
                      <Button
                        type="button"
                        className="text-primary max-w-fit bg-sky-100"
                      >
                        Upload Picture
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
                  type="submit"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? <Spinner /> : "Update Activity"}
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
