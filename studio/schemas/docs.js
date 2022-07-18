import {
  orderRankField,
  orderRankOrdering
} from "@sanity/orderable-document-list";

export default {
  name: "docs",
  title: "Docs",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "docs" }),
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: Rule => Rule.required(),
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      validation: Rule => Rule.required(),
      to: [{ type: "category" }]
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ]
};
