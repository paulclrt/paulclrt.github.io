---
draft: false 
title: Scientific software regarding space radiation dosages in satellites (Internship CEA)
page_title: Internship CEA Saclay - Département d'AstroPhysique 
filename_html: radiation-software-python-sectoral-analysis.html
subtitle: Translating scientific software for calculating radiation dosages on satellites to Python. Adding 3D visualization with WebGL and JavaScript.
html_description: Translating scientific software for calculating radiation dosages on satellites to Python. Adding 3D visualization with WebGL and JavaScript.
og_title: Scientific software regarding space radiation dosages in satellites (Internship CEA)
og_description: Translating scientific software for calculating radiation dosages on satellites to Python. Adding 3D visualization with WebGL and JavaScript.
og_image_url: code/assets/images/cea-1/image.avif
og_image_alt: Radiation dosage map inside of a satelite
images_list: ["code/assets/images/cea-1/image.avif", "code/assets/images/cea-1/map2.jpeg", "code/assets/images/cea-1/tab.jpeg", "code/assets/images/cea-1/arc.jpeg"]
skills: ["python", "threejs", "matplotlib", "javascript", "latex"]
---



(June 2023 - July 2023)

My work consisted of translating an already existing software written in IDL to python.
The software was responsible for computing radiation dosages for embedded systems in satellites based on different orbits.

The software was taking an imperative description of the satellite architecture made out of boxes and other geometrical shapes each made out of a unique material.
I had to use sector analysis to compute material density and other properties for each probes inside the satellites.
After that, I had to compute radiation dosages based on incoming particle and material properties.

Results were stored in hdf5 file format for better compression. They were also displayed using matplotlib to have a visual representation of the dense radiation areas.

I also had to implement a 3D visualisation tool to check/verify the satellite architecture to avoid errors. This was done parsing the architecture file and translating it into json. And with that json, we reconstruct the architecture of the satellite in 3D with threejs library in the web browser.

The documentation of my work was then written using LaTeX.
