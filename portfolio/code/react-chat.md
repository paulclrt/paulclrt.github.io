---
draft: false 
title: Cloud based encrypted note taking application
page_title: Personal react project for note taking, privacy and security
filename_html: cloud-react-note-privacy.html
subtitle: React application made to take notes and encrypt them. Storage on server with flask backend and sql database. Application is open soucre on my github <a href="https://github.com/paulclrt/ReactNote">paulclrt/ReactNote</a> Deploying into cloud (for fun) with docker, k8s, aws argoCD.
html_description: Developping react frontend and python backend. Deploying into cloud (for fun) with docker, k8s, aws argoCD.
og_title: Cloud based encrypted note taking application
og_description: Developping react frontend and python backend. Deploying into cloud (for fun) with docker, k8s, aws argoCD.
og_image_url: previous_portfolio/projects/demo-react-chat.webm
og_image_alt: Radiation dosage map inside of a satelite
images_list: ["previous_portfolio/projects/demo-react-chat.webm"]
skills: ["python", "sqlite3", "aws", "react", "javascript", "docker", "k8s", "opentofu", "bootstrap", "flask"]
---



(November 2024 - November 2024)


This is a simple project of mine. I already mastered all the technologies but had never deployed anything to the cloud before.
The goal was to dev a simple application (note taking) and deploy it by hand and also using automated and professional tools like terraform/opentofu, K8s, Docker...

There is nothing to say about the app in and of itself. Notes are encrypted using symetric keys based on user defined password.
Users authenticates, have a session with jwt (better for cloud environment than sessions). The app has been tested for idor and other common security vulnerabilities.

As I already said, this was just to learn cloud deployement and DevOps methodology.
