import Head from "next/head";
import Container from "@components/container";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { parseISO, format } from "date-fns";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";
import { TransformIcon } from "@radix-ui/react-icons";
import { singlequery, catquery, configQuery } from "@lib/groq";
import parseOutline from "@utils/parseOutline";
import Link from "next/link";
export default function Blog(props) {
  const { postdata, siteconfig, sidebar, preview } = props;

  const router = useRouter();
  const { slug } = router.query;
  const activeSlug = slug?.slice(-1).pop();

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: activeSlug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  // get outline from post
  // to create table of contents
  const outline = post && parseOutline(post.body);

  // for prev, next post links in the footer
  // "?" is needed here or it will throw error
  const docslist = sidebar?.map(a => a.items).flat();
  const currentPage = docslist?.findIndex(
    a => a.slug.current === activeSlug
  );
  const prevPost = docslist?.[currentPage - 1];
  const nextPost = docslist?.[currentPage + 1];
  console.log(prevPost);
  return (
    <>
      {post && siteConfig && (
        <Layout
          {...siteConfig}
          sidebar={sidebar}
          toc={outline}
          active={activeSlug}>
          <Container className="py-10">
            <h1 className="text-4xl font-bold text-gray-800">
              {post.title}
            </h1>
            <div className="mt-4 prose prose-violet prose-a:text-violet-500 max-w-none prose-pre:bg-slate-100 prose-pre:text-slate-700 prose-headings:scroll-m-20">
              {post.body && <PortableText value={post.body} />}
            </div>
            <div className="flex justify-between border-t mt-10 py-5">
              <div>
                {prevPost && (
                  <Link
                    href={`/docs/${prevPost?.category.slug.current}/${prevPost?.slug.current}`}>
                    <a className="flex flex-col items-start">
                      <span className="text-sm text-slate-400">
                        Previous
                      </span>
                      <span className="text-violet-500">
                        {prevPost.title}
                      </span>
                    </a>
                  </Link>
                )}
              </div>

              <div>
                {nextPost && (
                  <Link
                    href={`/docs/${nextPost?.category.slug.current}/${nextPost?.slug.current}`}>
                    <a className="flex flex-col items-end">
                      {" "}
                      <span className="text-sm text-slate-400">
                        Next
                      </span>
                      <span className="text-violet-500">
                        {nextPost.title}
                      </span>
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  // console.log(params);
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug.slice(-1).pop() // get last slug. the first maybe categories
  });
  const sidebar = await getClient(preview).fetch(catquery);

  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postdata: post,
      siteconfig: config,
      sidebar: sidebar,
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true // false or 'blocking'
  };
}
