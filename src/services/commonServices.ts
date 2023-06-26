import "@pnp/sp/webs";
import "@pnp/sp/security/web";
import "@pnp/sp/lists";

import "@pnp/sp/items/get-all";
import "@pnp/sp/site-scripts";
import "@pnp/sp/site-designs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/batching";
import "@pnp/sp/regional-settings/web";
import "@pnp/sp/attachments";
import "@pnp/sp/presets/all";

const commonServices = {

    _getCurrentLoginUser: async (sp: any) => {
        return await sp.web.currentUser();
    },

    _getSiteListByName: async (context: any, listName: string) => {
        var myHeaders = new Headers({
            'Accept': 'application/json; odata=verbose'
        });

        var myInit = {
            method: 'GET',
            headers: myHeaders,
        }

        return await fetch(context.pageContext.legacyPageContext.webAbsoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')", myInit).then((response) => {
            return response;
        });
    },

    _getFolderByPath: async (context: any, folderPath: string) => {
        var myHeaders = new Headers({
            'Accept': 'application/json; odata=verbose'
        });

        var myInit = {
            method: 'GET',
            headers: myHeaders,
        }

        return await fetch(context.pageContext.legacyPageContext.webAbsoluteUrl + "/_api/web/getFolderByServerRelativeUrl('" + folderPath + "')", myInit).then((response) => {
            return response;
        });
    },

    _getSiteScript: async (sp: any) => {
        return await sp.siteScripts.getSiteScripts();
    },

    _getSiteDesign: async (sp: any) => {
        return await sp.siteDesigns.getSiteDesigns();
    },

    _createSiteScript: async (context: any, sp: any) => {

        const classifiedSiteScript = {
            "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",
            "actions": [
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Choice\" ID=\"{41443201-627a-4fa8-b6b6-ac928f45bbfd}\" Name=\"CV_productCategory\" DisplayName=\"Product Category\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_productCategory\" Customization=\"\" Format=\"Dropdown\" FillInChoice=\"FALSE\" IsModern=\"TRUE\"> <Default>Laptop</Default><CHOICES><CHOICE>Laptop</CHOICE><CHOICE>Mobile</CHOICE><CHOICE>Ipad</CHOICE><CHOICE>Headphones</CHOICE><CHOICE>Smart Watch</CHOICE><CHOICE>Virtual Assistant Devices </CHOICE> </CHOICES></Field>"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Text\" ID=\"{b07d801c-0047-4360-a067-feec18f1cc00}\" Name=\"CV_otherProductCategory\" DisplayName=\"Other Product Category\" Required=\"False\" Group=\"_CV\" StaticName=\"CV_otherProductCategory\" Customization=\"\" />"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Number\" ID=\"{321f3e3c-cfdc-401b-9e8c-c328ae1e2f64}\" Name=\"CV_productPrice\" DisplayName=\"Product Price\" Required=\"TRUE\" StaticName=\"CV_productPrice\" Group=\"_CV\" Customization=\"\" />"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Number\" ID=\"{e67444b2-8f05-4bc6-9bd7-61b98fd25438}\" Name=\"CV_ContactNo\" DisplayName=\"Contact No\" Required=\"TRUE\" StaticName=\"CV_ContactNo\" Group=\"_CV\" Customization=\"\" />"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Text\" ID=\"{382b98d0-c51c-4ad6-82ff-a2c7cc20d777}\" Name=\"CV_location\" DisplayName=\"Location\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_location\" Customization=\"\" />"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Choice\" ID=\"{7779c80b-59f0-4a50-aff9-998c30a97344}\" Name=\"CV_productStatus\" DisplayName=\"Product Status\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_productStatus\" Customization=\"\" Format=\"Dropdown\" FillInChoice=\"FALSE\" IsModern=\"TRUE\"> <Default>Active</Default><CHOICES><CHOICE>Active</CHOICE><CHOICE>InActive</CHOICE><CHOICE>Sold</CHOICE></CHOICES></Field>"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Text\" ID=\"{d96c27a4-3d34-48fe-b5c3-19a0777700e5}\" Name=\"CV_shortDescription\" DisplayName=\"Short Description\" Required=\"TRUE\" Group=\"_CV\" StaticName=\"CV_shortDescription\" Customization=\"\" />"
                },
                {
                    "verb": "createSiteColumnXml",
                    "schemaXml": "<Field Type=\"Note\" ID=\"{8e0c5a02-aee9-4e30-a111-92c260899642}\" Name=\"CV_productDescription\" DisplayName=\"Product Description\" Required=\"FALSE\" NumLines=\"10\" IsolateStyles=\"TRUE\" StaticName=\"CV_productDescription\" Group=\"_CV\" Customization=\"\" />"
                },
                {
                    "verb": "createContentType",
                    "name": "CV_Classified_CT",
                    "description": "Classified App Content Type",
                    "id": "0x0100947717a5ffce43278ebe6ce504996740",
                    "hidden": false,
                    "group": "_CV",
                    "subactions":
                        [
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_productCategory"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_otherProductCategory"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_productPrice"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_ContactNo"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_location"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_productStatus"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_shortDescription"
                            },
                            {
                                "verb": "addSiteColumn",
                                "internalName": "CV_productDescription"
                            },
                        ]
                },
                {
                    "verb": "createSPList",
                    "listName": "CV_Classified_Products",
                    "templateType": 100,
                    "subactions": [
                        {
                            "verb": "addContentType",
                            "name": "CV_Classified_CT"
                        },
                        {
                            "verb": "setDescription",
                            "description": "This list contains Classified Products."
                        },
                        {
                            "verb": "setTitle",
                            "title": "Classified Products"
                        },
                        {
                            "verb": "addSPView",
                            "name": "All Items",
                            "viewFields": [
                                "LinkTitle",
                                "CV_productCategory",
                                "CV_otherProductCategory",
                                "CV_productPrice",
                                "CV_ContactNo",
                                "CV_location",
                                "CV_productStatus",
                                "CV_shortDescription",
                                "CV_productDescription",
                                "Attachments"
                            ],
                            "query": "",
                            "rowLimit": 100,
                            "isPaged": true,
                            "makeDefault": true,
                            "replaceViewFields": true
                        }
                    ]

                }
            ],
            "bindata": {},
            "version": "1"
        }
        return await sp.siteScripts.createSiteScript("ClassifiedSiteScript", "ClassifiedSiteScript", classifiedSiteScript);
    },

    _createSiteDesign: async (sp: any, siteScriptId: any) => {
        return await sp.siteDesigns.createSiteDesign({
            SiteScriptIds: [siteScriptId],
            Title: "ClassifiedSiteDesign",
            WebTemplate: "64",
        });
    },

    _applySiteDesignToSite: async (sp: any, siteDesignId: string, siteUrl: string) => {
        return await sp.siteDesigns.applySiteDesign(siteDesignId, siteUrl);
    },

    _getAllRoleDefinitions: async (sp: any) => {
        return await sp.web.roleDefinitions();
    },

    _getSiteGroupByName: async (sp: any, groupName: any) => {
        return await sp.web.siteGroups.getByName(groupName)();
    },

    _breakRollAssignments: async (sp: any, ListName: string, copyRoleAssignments: boolean, clearSubscopes: boolean) => {
        return await sp.web.lists.getByTitle(ListName).breakRoleInheritance(copyRoleAssignments, clearSubscopes);
    },

    _createNewPermission: async (sp: any, roleDefinitionsName: any, roleDefinitionsDescription: any, order: number, basePermission: any) => {
        return await sp.web.roleDefinitions.add(roleDefinitionsName, roleDefinitionsDescription, order, basePermission);
    },

    _roleAssignments: async (sp: any, ListName: any, principalId: number, roleDefId: number) => {
        return await sp.web.lists.getByTitle(ListName).roleAssignments.add(principalId, roleDefId);
    },

    _getListAllItems: async (sp: any, listName: any) => {
        return await sp.web.lists.getByTitle(listName).items.getAll();
    },

    _getListItemWithExpand: async (sp: any, listName: any, selectString: string, expandString: string) => {
        return await sp.web.lists.getByTitle(listName).items.select(selectString).expand(expandString).getAll();
    },

    _updateListItem: async (sp: any, listName: any, data: any, itemId: any) => {
        return await sp.web.lists.getByTitle(listName).items.getById(itemId).update(data);
    },

    _getContentTypeColumns: async (sp: any, contentTypeId: any) => {
        return await sp.web.contentTypes.getById(contentTypeId).fields();
    },

    _addListItem: async (sp: any, listName: any, item: any) => {
        return await sp.web.lists.getByTitle(listName).items.add(item);
    },

    _addMultipleAttachment: async (sp: any, listName: any, itemId: any, attachment: any) => {
        // return await sp.web.lists.getByTitle(listName).items.getById(itemId).attachmentFiles.add(attachment.path, attachment);

        const res: any = [];
        for (let i = 0; i < attachment.length; i++) {
            await sp.web.lists.getByTitle(listName).items.getById(itemId).attachmentFiles.add(attachment[i].name, attachment[i]).then((r: any) => res.push(r));
        }
        return res;
    },

    _checkRequiredValidation: async (dataObject: any, richTextValue: any, attachments: any, requiredFields: any) => {
        let errorMessage: any = {};
        requiredFields.forEach((requiredElement: any) => {

            if (dataObject[requiredElement] == "" || dataObject[requiredElement] === undefined) {
                errorMessage[requiredElement] = "*Required!";
            }

            if (dataObject["CV_productCategory"] == "Other") {
                if (dataObject["CV_otherProductCategory"] == "" || dataObject["CV_otherProductCategory"] === undefined) {
                    errorMessage["CV_otherProductCategory"] = "*Required!";
                }
            }

            if (richTextValue == "" || richTextValue === undefined) {
                errorMessage["CV_productDescription"] = "*Required!";
            }

            if (attachments.length === 0) {
                errorMessage["Attachments"] = "*Required!";
            }
            else if (attachments.length < 3) {
                errorMessage["Attachments"] = "*Minimum 3 Attachments Required!";
            }
        });
        return errorMessage;
    },


}
export default commonServices;