import { client } from "../../libs/client";
import type { Works } from "../../types/works";

// APIリクエストを行うパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "works" });

  const paths = data.contents.map((content: Works) => `/works/${content.id}`);
  return { paths, fallback: false };
};

// microCMSへAPIリクエスト
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "works", contentId: id });

  return {
    props: {
      works: data,
    },
  };
};

// Props（blog）の型
type Props = {
  works: Works;
};

export default function BlogId({ works }: Props) {
  return (
    <main>
      <h1>{works.title}</h1>
      <p>{works.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${works.content}`,
        }}
      />
    </main>
  );
}
