from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in formio/__init__.py
from formio import __version__ as version

setup(
	name="formio",
	version=version,
	description="formio",
	author="Hybrowlabs Technologies",
	author_email="chinmay@hybrowlabs.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
