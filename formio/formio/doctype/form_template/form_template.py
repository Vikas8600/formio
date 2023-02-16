# Copyright (c) 2023, Hybrowlabs Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import json
from operator import itemgetter

class FormTemplate(Document):
	pass

@frappe.whitelist()
def get_form_options(**kwargs):
    # List of form template map(fields) in the form builder
    # Returns list of fields along with its details
    try:
        form_field_data = frappe.db.get_all(   #List of all fields
            "Form Template Map",
            filters={"enabled": 1, "reference_doctype": kwargs.get("type")},
            fields=[
                "label",
                "name",
                "reference_doctype",
                "form_io_key",
                "doctype_key",
                "meta_data",
            ],
        )
        form_config = frappe._dict()
        for form_field in form_field_data:
            meta_data, doctype_key, label, form_io_key, reference_doctype, name = itemgetter( #fetching details of all fields one by one
                "meta_data",
                "doctype_key",
                "label",
                "form_io_key",
                "reference_doctype",
                "name",
            )(form_field)
            meta = json.loads(meta_data)
            form_config[form_field["form_io_key"]] = {
                "title": label,
                "icon": "terminal",
                "key": form_io_key,
                "label": label,
                "schema": {**meta, "key": form_io_key, "input": True},
            }
    except Exception as e:
        frappe.logger("sfa_online").exception(e)
    return form_config


@frappe.whitelist()
def get_types():
    # Returns list of doctype for which form template map(fields) are created
    try:
        form_field_data = frappe.db.get_all( # list of all fields
            "Form Template Map", filters={"enabled": 1}, fields=["reference_doctype"]
        )
        result = []
        for data in form_field_data: # Checks if doctype is already in result(else adds to result)
            if data.get("reference_doctype") not in result:
                result.append(data.get("reference_doctype"))
        return result
    except Exception as e:
        frappe.logger("sfa_online").exception(e)
