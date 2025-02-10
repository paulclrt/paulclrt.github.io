---
draft: false 
title: Handwritter Digit Recognition with react, django and Tensorflow (CNN & ANN versions)
page_title: Handwritter Digit Recognition with react, django and Tensorflow (self-learned AI)
filename_html: ai-digit-recognition-CNN-&-ANN.html
subtitle: The goal of this opensoruce project was to implement a simple CNN with a web app and understand how it all works together. 3 main technologies, Flask, React, Tensorflow. Simple but shows well what I am able to do in 2 days <a href="https://github.com/paulclrt/digit-recon">github link</a>
html_description: The goal of this opensoruce project was to implement a simple CNN with a web app and understand how it all works together. 3 main technologies, Flask, React, Tensorflow. Simple but shows well what I am able to do in 2 days 
og_title: Handwritter Digit Recognition with react, django and Tensorflow
og_description: The goal of this opensoruce project was to implement a simple CNN with a web app and understand how it all works together. 3 main technologies, Flask, React, Tensorflow. Simple but shows well what I am able to do in 2 days 
og_image_url: previous_portfolio/projects/demo.avif
og_image_alt: Screenshot of frontend of the ai digit detection frontend. Canva with number 8 drawn and AI prediction is number 8 at 99% accuracy
images_list: ["previous_portfolio/projects/demo.avif"]
skills: ["tensorflow", "python", "react", "docker", "django"]
---



(November 2024 - November 2024)


This is a personal project of mine. When I first started learning about AI, this is the kind of project that I built. It goas alongside my project of the AI <a href="https://paulclaret.pro/">education platform</a> that teach people Artifical intelligence with free articles, videos, animations, diagrams...

The project consists of drawing digits on a 28x28 pixels canva and send it to the model for detection. Then return the prediction to the user.
The goal was just to choose the appropriate architecture for the problem (CNN outperformed ANN no surprises here) and train it. I used Tensorflow for the ai framework for no particular reason over pytorch. I trained the model, saved it. I implemented a simple django backend with an api route going to the model i trained to get prediction on the number the user draws. It also serves the frontend I wrote in react to draw the digits and send the image to the server for prediction.

Overall: simple project that was fun for me to build. But the real ai project is the ai education platform i built.
