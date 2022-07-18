export default {
  name: "siteconfig",
  type: "document",
  title: "Site Settings",
  __experimental_actions: [
    /* "create", "delete", */ "update",
    "publish"
  ],
  fieldsets: [
    {
      title: "SEO & metadata",
      name: "metadata",
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      title: "Social Media",
      name: "social"
    },
    {
      title: "Website Logo",
      name: "logos",
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site title"
    },
    {
      title: "URL",
      name: "url",
      type: "url",
      description: "The main site url. Used to create canonical url"
    },
    {
      name: "copyright",
      type: "string",
      title: "Copyright Name",
      description: "Enter company name to appear in footer after ©"
    },
    {
      title: "Main navigation",
      name: "navigation",
      description: "Select pages for the top menu",
      validation: Rule => [
        Rule.max(5).warning(
          "Are you sure you want more than 5 items?"
        ),
        Rule.unique().error("You have duplicate menu items")
      ],
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }]
        }
      ]
    },

    {
      name: "homepage",
      type: "reference",
      description: "Choose page to be the home page (index page)",
      to: { type: "docs" }
    },
    {
      title: "Main logo",
      description: "Upload your main logo here. SVG preferred. ",
      name: "logo",
      type: "image",
      fieldset: "logos",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true
          }
        }
      ]
    },

    {
      title: "Alternate logo (optional)",
      description:
        "Upload alternate logo here. it can be light / dark variation ",
      name: "logoalt",
      type: "image",
      fieldset: "logos",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true
          }
        }
      ]
    },

    {
      name: "address",
      type: "blockContent",
      title: "Office Address"
    },

    {
      name: "email",
      type: "string",
      title: "Support Email",
      validation: Rule =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email", // Error message is "Does not match email-pattern"
            invert: false // Boolean to allow any value that does NOT match pattern
          }
        )
    },

    {
      name: "phone",
      type: "string",
      title: "Support Phone"
    },

    {
      name: "social",
      type: "array",
      title: "Social Links",
      description: "Enter your Social Media URLs",
      validation: Rule => Rule.unique(),
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "media",
              title: "Choose Social Media",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Linkedin", value: "linkedin" },
                  { title: "Youtube", value: "youtube" }
                ]
              }
            },
            {
              type: "url",
              name: "url",
              title: "Full Profile URL"
            }
          ],
          preview: {
            select: {
              title: "media",
              subtitle: "url"
            }
          }
        }
      ]
    },

    // {
    //   name: "terms",
    //   title: "Terms Page",
    //   type: "reference",
    //   to: [{ type: "menus" }]
    // },

    // {
    //   name: "privacy",
    //   title: "Privacy Page",
    //   type: "reference",
    //   to: [{ type: "menus" }]
    // },

    {
      title: "Meta Description",
      name: "description",
      fieldset: "metadata",
      type: "text",
      rows: 5,
      validation: Rule => Rule.min(20).max(200),
      description: "Enter SEO Meta Description"
    },

    {
      name: "openGraphImage",
      type: "image",
      title: "Open Graph Image",
      description:
        "Image for sharing previews on Facebook, Twitter etc.",
      fieldset: "metadata"
    }
  ]
};
