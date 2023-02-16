// Copyright (c) 2021, Hybrowlabs Technologies and contributors
// For license information, please see license.txt
$("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: "https://cdn.form.io/formiojs/formio.full.min.css",
  }).appendTo("head");
  frappe.ui.form.on("Form Template", {
    type: async function(frm){
      const formInst = frm;
      if (!window.Formio) {
        await new Promise((resolve) => {
          $.getScript(["https://cdn.form.io/formiojs/formio.full.min.js"], () => {
            resolve();
          });
        }); 
      }
      let formBuilder = "";
      const formFields = await frappe.call({
          method: "formio.formio.doctype.form_template.form_template.get_form_options",
          args:{ type: frm.doc.type }
      })
        .then((r) => {
          Formio.setProjectUrl(window.location.origin)
          Formio.setBaseUrl(window.location.origin);
          formBuilder = Formio.builder(
            document.getElementById("builder"),
            frm.doc.json_data ? JSON.parse(frm.doc.json_data) : {},
            {
              builder: {
                basic: false,
                advanced: false,
                data: false,
                premium: false,
                custom: {
                  title: "User Fields",
                  weight: 10,
                  components: r.message,
                },
                layout: {
                  components: {
                    table: false,
                  },
                },
              },
              editForm: {
                textfield: [
                  {
                    key: "api",
                    ignore: true,
                  },
                ],
              },
            }
          ).then((builder) => {
            builder.on("saveComponent", async () => {
              await formInst.set_value(
                "json_data",
                JSON.stringify(builder.schema, null, 1)
              );
              Formio.createForm(
                document.getElementById("renderer"),
                builder.schema,
                { disabled: true }
              ).then((form) => {
                form.on("change", (submission) => {
                  document.getElementById(
                    "submission"
                  ).innerHTML = `<code>${JSON.stringify(submission.data)}</code>`;
                });
              });
            });
          });
        });
      
    },
    refresh: async function (frm) {
      const formInst = frm;
      if (!window.Formio) {
        await new Promise((resolve) => {
          $.getScript(["https://cdn.form.io/formiojs/formio.full.min.js"], () => {
            resolve();
          });
        });
      }
  
  
      
   
      frappe.call(
        "formio.formio.doctype.form_template.form_template.get_types"
      ).then((r) => {
        const options = []
        for(let i=0;i<r.message.length;i++){
          options[i] = r.message[i];
        frm.set_df_property('type','options',[""].concat(options));
        }
      });
  
  
  //       let type = document.createElement('select');
  //       type.id = "type";
  //       type.class = "form-control";
  //       for (var i = 0; i < r.message.length; i++) {
  //         var option = document.createElement("option");
  //         option.text = r.message[i];
  //         option.value = r.message[i];
  //         if (i == 0) {
  //           option.selected = true;
  //         }
  //         type.add(option);
  //       }
  //       return type
  //     });
  //     type_select.className = "form-control";
  //     var select_div = document.createElement('div');
  //     select_div.className = "col-md-3 mb-2";
  //     select_div.id = 'select_div';
  //     select_div.innerHTML="<h2>Type</h2>"
  //     select_div.appendChild(type_select);
  // frm.page.body[0].prepend(select_div);
  // type_select.onchange = function(){
  //   form_builder();
  // }
  form_builder();
  let formBuilder = "";
      async function form_builder(){
      const formFields = await frappe.call({
          method: "formio.formio.doctype.form_template.form_template.get_form_options",
          args:{ type: frm.doc.type }
      })
        .then((r) => {
          formBuilder = Formio.builder(
            document.getElementById("builder"),
            frm.doc.json_data ? JSON.parse(frm.doc.json_data) : {},
            {
              builder: {
                basic: false,
                advanced: false,
                data: false,
                premium: false,
                custom: {
                  title: "User Fields",
                  weight: 10,
                  components: r.message,
                },
                layout: {
                  components: {
                    table: false,
                  },
                },
              },
              editForm: {
                textfield: [
                  {
                    key: "api",
                    ignore: true,
                  },
                ],
              },
            }
          ).then((builder) => {
  
            builder.on("saveComponent", async () => {
              await formInst.set_value(
                "json_data",
                JSON.stringify(builder.schema, null, 1)
              );
              Formio.createForm(
                document.getElementById("renderer"),
                builder.schema,
                { disabled: true }
              ).then((form) => {
                form.on("change", (submission) => {
                  document.getElementById(
                    "submission"
                  ).innerHTML = `<code>${JSON.stringify(submission.data)}</code>`;
                });
              });
            });
          });
        });
      }
    },
  
  
  });
  
  
  // frappe
  // .call(
  //   "sfa_online.sfa_tournament.doctype.tournament.tournament.get_athlete_meta",
  //   { throw_if_missing: false }
  // )
  // .then((r) => {
  //   Formio.builder(
  //     document.getElementById("builder"),
  //     frm.doc.json_data ? JSON.parse(frm.doc.json_data) : {},
  //     {
  //       builder: {
  //         basic: false,
  //         advanced: false,
  //         data: false,
  //         premium: false,
  //         // customBasic: {
  //         //   title: 'Basic Components',
  //         //   default: true,
  //         //   weight: 0,
  //         //   components: {
  //         //     textfield: true,
  //         //     textarea: true,
  //         //     email: false,
  //         //     phoneNumber: false,
  //         //     button: true
  //         //   }
  //         // },
  //         custom: {
  //           title: "User Fields",
  //           weight: 10,
  //           components: r.message.fields.reduce((acc, r) => {
  //             let parseData = acc;
  //             if (r.fieldname) {
  //               console.log(r.fieldname)
  //               parseData[r.fieldname] = {
  //                 title: r.label,
  //                 key: r.fieldname,
  //                 icon: "terminal",
  //                 propertyName: r.fieldname,
  //                 schema: {
  //                   placeholder:"hey",
  //                   label: r.label,
  //                   type: "textfield",
  //                   key: "a"+Math.floor(Math.random()*100)+ r.label.replace(/ /g,"")+"__"+r.fieldname,
  //                   propertyName: r.fieldname,
  //                   input: true,
  //                 },
  //               };
  //             }
  //             return parseData;
  //           }, {}),
  //         },
  //         layout: {
  //           components: {
  //             table: false,
  //           },
  //         },
  //       },
  //       editForm: {
  //         textfield: [
  //           // {
  //           //   key: "api",
  //           //   ignore: true,
  //           // },
  //         ],
  //       },
  //     }
  //   ).then((builder) => {
  //     console.log("frm",frm)
  //     builder.on("saveComponent", async () => {
  //       await formInst.set_value(
  //         "json_data",
  //         JSON.stringify(builder.schema)
  //       );
  //       Formio.createForm(
  //         document.getElementById("renderer"),
  //         builder.schema,
  //         { disabled: true }
  //       ).then((form) => {
  //         form.on("change", (submission) => {
  //           document.getElementById(
  //             "submission"
  //           ).innerHTML = `<code>${JSON.stringify(
  //             submission.data
  //           )}</code>`;
  //         });
  //       });
  //     });
  //   });