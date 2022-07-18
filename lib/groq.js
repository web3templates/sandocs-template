import { groq } from "next-sanity";

export const docsquery = groq`
*[_type == "docs"] | order(_createdAt desc) {
  ...,
  category->,
}
`;

export const catquery = groq`
*[_type == "category"] | order(orderRank) {
  ...,
  "items": *[_type == "docs" && category._ref == ^._id] | order(orderRank) {
    title,
    slug,
    "category": category-> {slug},
    _id,
  }
}
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`;

export const singlequery = groq`
*[_type == "docs" && slug.current == $slug][0] {
  ...,
  category->,
  body[] {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        ...,
        reference->,
        "slug": @.reference->slug
      }
    }
  }
}
`;

export const pathquery = groq`
*[_type == "docs"] {
  'slug': slug.current,
}
`;
