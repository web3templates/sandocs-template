export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" }
      ],

      // Marks let you mark up inline text in the block editor.
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "docs" }
                  // other types you may want to link to
                ]
              }
            ]
          },
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url"
              }
            ]
          }
        ]
      }
    },
    {
      type: "code"
    },
    {
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "alert",
      title: "Alerts",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            layout: "dropdown",
            list: [
              { value: "info", title: "Info" },
              { value: "success", title: "Success" },
              { value: "warning", title: "Warning" },
              { value: "error", title: "Error" }
            ]
          }
        },
        {
          name: "title",
          title: "Title",
          type: "string"
        },
        {
          name: "description",
          title: "Description",
          type: "text"
        },
        {
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            {
              title: "URL",
              name: "href",
              type: "url",
              validation: Rule =>
                Rule.uri({
                  allowRelative: true
                })
            },
            {
              title: "Text",
              name: "text",
              type: "string"
            }
          ]
        }
      ],
      preview: {
        select: {
          title: "title",
          description: "description"
        },
        prepare({ title, description, type }) {
          return {
            title: title,
            subtitle: description
          };
        }
      }
    },

    {
      name: "table",
      title: "Table",
      type: "object",
      fields: [
        {
          name: "table",
          title: "Add Table",
          description:
            "The first row will be treated as the header. If you want to skip, just leave the first row empty.",
          type: "table"
        }
      ]
    },

    {
      name: "box",
      title: "Feature Box",
      type: "object",
      fields: [
        {
          name: "columns",
          title: "Number of Columns",
          type: "string",
          options: {
            list: [
              { value: "1", title: "One Column" },
              { value: "2", title: "Two Columns" }
            ]
          }
        },
        {
          name: "items",
          title: "Items",
          type: "array",
          description: "Add featured boxes. Maximum of 4 items.",
          validation: Rule => Rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  description: "SVG Icons only. Preferred 24x24px.",
                  type: "image",
                  options: {
                    accept: "image/svg+xml"
                  }
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string"
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2
                },

                {
                  name: "link",
                  title: "Link",
                  type: "object",
                  fields: [
                    {
                      title: "URL",
                      name: "href",
                      type: "url",
                      validation: Rule =>
                        Rule.uri({
                          allowRelative: true
                        })
                    },
                    {
                      title: "Text",
                      name: "text",
                      type: "string"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      preview: {
        select: {
          subtitle: "columns"
        },
        prepare({ subtitle }) {
          return {
            title: `Featured Boxes`,
            subtitle: `${subtitle} Columns`
          };
        }
      }
    }
  ]
};
