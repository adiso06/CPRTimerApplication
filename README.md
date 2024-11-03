# CPR Timer Web App

The **CPR Timer Web App** is designed to assist healthcare providers during cardiac arrest scenarios by tracking key timings and guiding them through the American Heart Association's (AHA) algorithm. This mobile-first web app offers interactive timers for CPR, epinephrine, and total session time, as well as reminders for secondary medications, a Quick Reference, and a step-by-step algorithm for managing cardiac arrest. The app aims to streamline the process of delivering high-quality CPR and medication management in critical moments.

## Features

### 1. Timers
   - **Epinephrine Timer**: 
     - Counts up to 3 minutes initially.
     - Changes color to yellow between 3-5 minutes as a visual warning.
     - Turns red at 5 minutes to signal that another dose may be needed.
   - **CPR Timer**:
     - Can be started by either clicking the main start button or by clicking any timer element.
     - Counts up to 2 minutes for each CPR cycle.
     - Turns red at 2 minutes to remind the user that a pulse check may be required.
     - Each click increments a counter to show how many CPR cycles have been completed.
   - **Total Time**:
     - Displays the total elapsed time since the beginning of the session.
     - Positioned above the CPR Timer and Epinephrine Timer for continuous visibility.

### 2. Secondary Medications Section
   - Located below the CPR and Epinephrine timers for easy access.
   - Displays a list of additional medications (e.g., lidocaine, amiodarone, bicarbonate, calcium).
   - For each medication, shows the time since it was last administered (e.g., "Last given: 3 mins ago").
   - Includes a button for each medication that, when clicked, logs the administration time and updates the elapsed time since it was last given.

### 3. Quick Reference
   - Positioned at the top of the screen above the primary timers.
   - Provides a concise summary of key information related to CPR and epinephrine dosing intervals, enabling quick access to essential guidelines.

### 4. Cardiac Arrest Algorithm
   - Displayed below the Quick Reference section, providing a step-by-step layout of the cardiac arrest algorithm.
   - The algorithm is interactive, with sections expanding or contracting based on user interaction and progression through the flow. Key steps include:
   
     #### Algorithm Flow
     - **Start CPR**: Initial step reminding users to give oxygen and attach a monitor or defibrillator.
     - **Rhythm Check**: Prompts the user to determine if the rhythm is shockable with “Yes” and “No” options.
     
       **Shockable Rhythm Path (VF/pVT Pathway)**:
       - **Shock Step**: Initiates the shock sequence.
       - **CPR Step**: Starts a 2-minute CPR cycle with reminders for IV/IO access.
       - **Rhythm Check**: Allows the user to assess if the rhythm remains shockable and continue through the pathway if "Yes." If "No," the algorithm guides users to alternative steps.
       - **Additional Steps**: Includes epinephrine dosing every 3-5 minutes, considerations for advanced airway management, and capnography.
       - **Final Shock and Reversible Causes**: Provides instructions for a final shock, followed by a CPR interval with options for amiodarone or lidocaine and treatment of reversible causes.
       
       **Non-Shockable Rhythm Path (Asystole/PEA Pathway)**:
       - **Epinephrine Administration**: Prompted immediately upon identifying asystole or PEA.
       - **CPR Intervals**: Structured 2-minute CPR intervals with instructions for IV/IO access and continued epinephrine administration every 3-5 minutes.
       - **Extended Path for Non-Shockable Rhythm**: Includes additional CPR with prompts to treat reversible causes if the rhythm remains non-shockable.
     
     #### Final Step
     - **Step 12**: Guides users on next steps if there are no signs of ROSC (Return of Spontaneous Circulation). 
     - Users are directed to either continue with previous steps or, if ROSC is achieved, proceed to post-cardiac arrest care and assess the appropriateness of continued resuscitation.

### 5. Session Log
   - A scrollable log at the bottom of the screen records each key action, including:
     - Epinephrine doses administered.
     - CPR cycles and pulse checks.
     - Administration of secondary medications.
     - Key time milestones, such as every 5 minutes of total session time.
   - Each log entry includes a timestamp and a brief description of the action taken (e.g., "00:02:00 - Epinephrine dose administered").
   - The log is accessible by scrolling down, allowing users to review the session history without crowding the main interface.

### 6. Interactive Interface
   - The app includes buttons for user interactions at each step, such as starting timers, administering medications, and advancing through the algorithm.
   - Color-coded elements and timers provide intuitive visual cues for easy tracking, even under pressure.

### 7. Mobile-First Design
   - Designed with mobile users in mind, providing a responsive and accessible experience on smaller screens.
   - Layout is optimized for easy access to critical information, with essential timers and controls prominently displayed.

## Usage

1. **Access the Web App**: Open the app in a browser on your mobile device or desktop. (No download is required as this is a web-based application.)
2. **Starting CPR**: Click the main start button or any of the timer elements to begin the session.
3. **Using Timers**:
   - Track CPR cycles, epinephrine dosing, and total elapsed time.
   - Visual indicators and color changes alert users to key intervals.
4. **Administering Medications**:
   - Track epinephrine doses directly via the Epinephrine Timer.
   - Access secondary medications in the section below the main timers and log doses as they are administered.
5. **Follow the Algorithm**: Use the interactive algorithm steps to navigate the AHA-recommended pathways based on rhythm checks and response to treatment.
6. **Reviewing the Log**: Scroll down to view the session log, including timestamps of key actions for easy review or handoff.

## ToDo
- [ ] Prettier algorithm that's easier to read
- [ ] Add reversible causes of cardiac arrest
- [ ] When to consider ecmo
- [ ] Exportable one paragraph summary of code.
- [ ] Time of Death
- [ ] FYIs about certain meds?
- [ ] SHOCK BUTTON
## To Fix 
- [ ] Center Main Timer
- [ ] Optimize for mobile use

