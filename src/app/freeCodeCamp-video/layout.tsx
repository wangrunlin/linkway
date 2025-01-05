// import { baseURL, ITEMS_PER_PAGE } from "@/config";
// import { Metadata } from "next";

// export async function generateMetadata({
//   searchParams,
// }: {
//   searchParams: Promise<{ page?: string }>;
// }): Promise<Metadata> {
  // const params = await searchParams;
  // const currentPage = Number(params.page) || 1;
  // const data = await getProducts(currentPage);
  // const totalPages = Math.ceil(
  //   (data.pageInfo?.totalRows || data.list.length) / ITEMS_PER_PAGE
  // );

  // return {
    // title: generatePageMetadata(currentPage, totalPages),
//     title: "FreeCodeCamp Video",
//     description: "FreeCodeCamp Video",
//     keywords: "FreeCodeCamp Video",
//     openGraph: {
//       title: "FreeCodeCamp Video",
//       description: "FreeCodeCamp Video",
//       images: data.list.slice(0, 4).map((product) => ({
//         url: product.imageUrl,
//         width: 800,
//         height: 800,
//       })),
//     },
//     alternates: {
//       canonical: `${baseURL}${currentPage === 1 ? "" : `?page=${currentPage}`}`,
//     },
//   };
// }

export default function FreeCodeCampVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
