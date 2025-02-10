---
draft: false
title: Elevator FPGA state machine controller on DE-10 lite
filename_html: fpga-statemachine.html
page_title: Elevator FPGA state machine controller on DE-10 lite
subtitle: School project requiring us to build an elevator controller with an FPGA to serve customer their requests with states machines. Developpments of logics blocks and functions for different functionalities (door security measures, floor indication, requested floors...) on INTEL quartus prime and state machines
html_description: School project to learn how to program FPGA width VHDL on INTEL quartus prime and state machines
og_title: Elevator FPGA state machine controller on DE-10 lite
og_description: School project to learn how to program FPGA width VHDL on INTEL quartus prime and state machines
og_image_url: previous_portfolio/projects/ELEVATOR-ECE-1.avif
og_image_alt: FPGA assembled with breadboard components. Leds representing building levels, and the board
images_list: ["previous_portfolio/projects/ELEVATOR-ECE-1.avif", "previous_portfolio/projects/ELEVATOR-ECE-2.avif"]
skills: ["vhdl", "wire", "pcb"]
---



(November 2023 - December 2023)

This projecte consisted of using the Altera MAX DE-10Lite board to learn how to program in vhdl.
The goal was to build an elevator state machine using vhdl and other components like shift register... and IO to communicate with outside components for additional functionality.

The project was realised in groups of 2 over the course of a week and a half.

Functionalities of the project are:
1. Door obstruction sensitivity with ultrasound
2. Elevator algorithm (state machine)
3. Door closing animation
4. level indication with board IO and shift register to inform the user
5. BONUS: VGA screen display of current elevator level.
