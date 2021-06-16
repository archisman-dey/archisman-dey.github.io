---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

### Posting Schedule

#### Community Bonding Period (17th May - 7th June)
I will be posting once a week, since my pre work is mainly reading documentation and tutorials. Expect posts on 24th May, 31st May and 7th June.
#### Coding Period (7th June - 23rd August)
I will be updating what I did daily, with a summary post about what I did, what issues I'm facing and how I'm going to solve them at the end of the week. Also, I will write two posts on [the BeagleBoard blog](https://beagleboard.org/blog/) during the two evaluation periods - mid July and mid August.

### Before getting accepted
- Built gcc-pru from source following [instructions on dinuxbg's GitHub](https://github.com/dinuxbg/gnupru#building-from-sources).
- Built simpPRU from source following [instructions on Vedant's GitHub](https://github.com/VedantParanjape/simpPRU#building-from-source).
- Read some basics about flex and bison
- Read about the third party C libraries used in simpPRU - vec, klib, cJson
- Played around with simpPRU code

### Week 0.1 (17th May - 24th May)
- 17th May: Got the accepted email!
- 18th May: Went through the proposal again, completed GSoC formalities
- 19th May: Setup this GitHub pages site, had weekly meeting with mentors
- 20th May: Tweaked this site, added About Me section
- 21st - 24th May: Currently going through the tutorials/videos/articles on flex, bison and how to write a simple compiler listed in [simpPRU's GitHub Wiki](https://github.com/VedantParanjape/simpPRU/wiki#resources-that-helped-a-lot)

### Week 0.2 (24th May - 31st May)
- went through [writing a simple compiler on my own](https://steemit.com/utopian-io/@drifter1/writing-a-simple-compiler-on-my-own-generating-code-for-assignments-part-1), a tutorial series for writing a compiler for a subset of a C like language

### Week 0.3 (31st May - 7th June)
- 1st June: received PocketBeagle, along with a micro SD card and a USB card reader
- 2nd June: installed Debian, got USB internet sharing working following this [gist](https://gist.github.com/pdp7/d2711b5ff1fbb000240bd8337b859412), built simpPRU from source on the PocketBeagle
- 3rd - 6th June: playing around with PocketBeagle and simpPRU

### Week 1 (7th June - 14th June)
- 7th June: Read [Intro to Modern CMake](https://cliutils.gitlab.io/modern-cmake/) and some other articles
- 8th June: Read about testing in CMake, created basic tests folder, received BeagleBone Blue and BeagleBone AI
- 9th June: Setup Blue and AI (installed Debian, updated kernel and scripts, configured internet sharing) weekly meeting with mentors on Jitsi, notes for the meeting: [Meeting 1 Notes (pastebin)](https://pastebin.com/6E0NSy5k)
- 10-14th June:
    - worked a bit on the "infrastructure" for adding tests
    - added JSON file containing the pinouts for the BeagleBone Blue
    - added support for BeagleBone Blue apart from using header pins
    - read PRU Cookbook
- 13th June: Introductory Youtube Video: https://www.youtube.com/watch?v=-zZ57sqQPSY

### Week 2 (14th June - 21st June)
- 16th June: Had weekly meeting with mentors on Jitsi, notes for the meeting: [Meeting 2 Notes (pastebin)](https://pastebin.com/Anf9U3i9)
- will complete adding tests by this week
