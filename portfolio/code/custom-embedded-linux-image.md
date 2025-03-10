---
draft: false 
title: Custom Linux Image (buildroot) and cross-compilation of video surveillance software for simple embedded system on a raspberry pi 3 board + Linux drivers
page_title: Custom Linux Image (buildroot) and cross-compilation of video surveillance software for simple embedded system on a raspberry pi 3 board + Linux drivers
filename_html: custom-linux-image-embedded-systems.html
subtitle: Personal project of mine. Creation & cross compilation of a custom linux image using buildroot for a video surveillance camera system using a raspberry pi 3 board and its camera. (Cross compilation and manipulation of linux drivers too)
html_description: Personal project of mine. Creation & cross compilation of a custom linux image using buildroot for a video surveillance camera system using a raspberry pi 3 board and its camera. (Cross compilation and manipulation of linux drivers too)
og_title: Custom Linux Image (buildroot) and cross-compilation of video surveillance software for simple embedded system on a raspberry pi 3 board
og_description: Personal project of mine. Creation & cross compilation of a custom linux image using buildroot for a video surveillance camera system using a raspberry pi 3 board and its camera. (Cross compilation and manipulation of linux drivers too)
og_image_url: code/assets/i_images/embedded_linux/PI boot.jpg
og_image_alt: Arduino breadboard assembly of ECG with 2 oled displays, one arduino, one heartbeat sensor, buttons and other controls
images_list: ["code/assets/i_images/embedded_linux/PI boot.jpg", "code/assets/i_images/embedded_linux/picam.jpg", "code/assets/i_images/embedded_linux/pi_internet.jpg", "code/assets/i_images/embedded_linux/pi_router.jpg"]
skills: ["wire", "antenna", "pcb", "linux", "cpp", "rpi", "opencv"]
---


March 2025 - March 2025 

Personal project of mine (this is not a school project or anything I was forced to do).
The motivation behind this project was to learn the insides of linux and how to customize it to the fullest and find its applications in embedded systems.
I have been using linux for years now but it always was this blackbox (that worked better than windows) but I never fully understood its insides and how it worked.
My curiosity drove me to do this project. I initially started using the yocto project to compile my image but switched to buildroot since my project requirements were not that big. (again: the goal was to learn linux more than to build a big application). I first chose the preconfigured image and studied its parameters and noticed thins that were not functioning with the default one (Wireless access...). I had to go deeper and customize the rights drivers and build my proper image for it to work.

I learned a lot about how linux work (and the fact that I was running GNU/Linux this whole time).
With that simple image running an openssh server, i could log into it and use it normally but I had a better idea than stay there.
I decided to build a simple project in cpp that used the pi camera module and v4l2 drivers to get the video captured. With that video, I built a simple http server with the cpp crow framework and made a simple streaming service behind a password.

In the end, I cross compiled my program and installed it inside my image. Once my program was on the board, it started as a service and I was able to request the video feed on my home network.



That was a great learning experience on the linux side and for me too because i used heavier buildtools/cross-compilation like cmake/meson instead of having my code editor do all the work.

