# Copyright (c) 2023, Hybrowlabs Technologies and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class FormTemplateMap(Document):
	pass

def file_transformer(val):
    try:
        frappe.logger("sfa_online").debug(val)
        list_item = val[0] 
        file = list_item['data']['message']['file_url']
        return file
    except Exception as e:
        frappe.logger("sfa_online").exception(e)