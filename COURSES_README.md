# Course Pages and PDF Links

This document explains **how to maintain course information**, **create/edit course HTML pages**, and **name/link PDF files** for problem sets or handouts.

Everything is designed so that you (or your student helper) can work mainly with a **single text file**: `COURSES.txt`.

---

## 1. The course data file: `COURSES.txt`

`COURSES.txt` is the **source of truth** for all courses that appear on your Teaching page and have dedicated course pages.

### 1.1 Structure of the file

- The file is plain text.
- It is divided into **course blocks**.
- Each block begins with a line starting with `COURSE:`.
- Blocks are separated by a line that contains exactly:

```text
---
```

Inside each block, the fields appear in this order:

```text
COURSE: <course-id>
Title: <full course title>
ShortName: <short name used on teaching page>
Level: <target students>
Institution: <where you taught this>
Semesters: <comma-separated list>
Books:
- <Book 1>
- <Book 2>
Syllabus:
<<<
<free text syllabus, can be multiple lines>
<<<
ProblemSets:
- <Label 1> | <suggested-pdf-filename-1>
- <Label 2> | <suggested-pdf-filename-2>
```

### 1.2 Meaning of each field

- **COURSE**  
  Short ID that also appears in the HTML filename. Examples:
  - `course-real-analysis`
  - `course-functional-analysis`

- **Title**  
  The full heading shown on the course page.

- **ShortName**  
  A shorter label used on `teaching.html` (the Teaching overview).

- **Level**  
  Who the course is for, e.g. `Integrated MSc Students`.

- **Institution**  
  Where you taught the course.

- **Semesters**  
  One or more semesters, separated by commas:  
  `Fall 2025, Fall 2026`.

- **Books**  
  A list of suggested books, one per line starting with `- `.

- **Syllabus**  
  A free-text description between `<<<` and `>>>`.  
  You may use multiple lines here.

- **ProblemSets**  
  A list of practice sets or handouts. Each line has:

  ```text
  - <Label> | <suggested-pdf-filename>
  ```

  Example:

  ```text
  - Practice Set 1 | course-real-analysis-ps1.pdf
  ```

You can see concrete examples for all current courses inside `COURSES.txt`.

---

## 2. PDF naming convention

We recommend naming PDFs so they are easy to recognize and group by course.

**Pattern:**

```text
<COURSE-ID>-<type><number>.pdf
```

Where:

- `<COURSE-ID>` is the same as in the `COURSE:` field (e.g. `course-real-analysis`).
- `<type>` can be `ps` (problem set), `notes`, `handout`, etc.
- `<number>` is a running number: `1`, `2`, `3`, ...

**Examples:**

- `course-real-analysis-ps1.pdf`  (Problem Set 1)
- `course-real-analysis-ps2.pdf`  (Problem Set 2)
- `course-math-ii-notes1.pdf`     (Notes 1 for Math II)

You may place these PDFs either:

- In the site root (same folder as the HTML files), or
- Inside a subfolder, for example `course-files/`.

If you use a subfolder, the `ProblemSets` entry should include the folder in the filename, e.g.:  
`course-files/course-real-analysis-ps1.pdf`.

---

## 3. How to add a **new course**

Follow these steps whenever you teach a new course and want a course page.

### Step 1: Add a block to `COURSES.txt`

1. Open `COURSES.txt`.
2. Copy an existing block (for example the one for `course-real-analysis`).
3. Paste it at the end of the file, above the final `---`.
4. Change the fields:
   - `COURSE:` (choose a new ID, such as `course-pde-intro`).
   - `Title:` (full course title).
   - `ShortName:` (short version).
   - `Level:`, `Institution:`, `Semesters:`.
   - Fill in `Books:` and `Syllabus:`.
   - Under `ProblemSets:`, add lines and suggested PDF names.
5. Make sure the block ends with a line containing `---`.

### Step 2: Create the HTML page for the course

1. Pick an existing course page as a template (for example `course-real-analysis.html`).
2. Copy that file and rename it to match your new course ID.  
   Example: if `COURSE: course-pde-intro`, name the file:

   ```text
   course-pde-intro.html
   ```

3. Inside the new HTML file, update:
   - `<title>...</title>` in the `<head>`.
   - The main heading `<h2 class="work-description">...</h2>`.
   - The **Level / Institution / Semesters** paragraphs.
   - The **Suggested Books** list.
   - The **Syllabus** paragraph(s).
   - The **Practice Problem Sets** list:
     - Use the labels and PDF filenames you wrote in `COURSES.txt`.

4. Keep the navbar, `styles.css` link, and the `"← Back to Teaching Overview"` link unchanged.

### Step 3: Link the course from `teaching.html`

1. Open `teaching.html`.
2. Find the correct section (Current/Upcoming or Past Courses).
3. Add or edit a list item so the course name links to your new file. For example:

```html
<li><p><a href="course-pde-intro.html">PDEs (Intro)</a> - (For MSc Students) - Spring 2027</p></li>
```

4. Save the file.

Now students can click the course name on the Teaching page and reach the new course page.

---

## 4. How to add or update **problem set PDFs**

1. Choose a filename using the convention in section 2, e.g.

   ```text
   course-real-analysis-ps1.pdf
   ```

2. Place the PDF in:
   - the same folder as your HTML files, **or**
   - a subfolder like `course-files/`.

3. In `COURSES.txt`, make sure the `ProblemSets` line uses the same path:

   ```text
   - Practice Set 1 | course-real-analysis-ps1.pdf
   ```

   or, if you use a folder:

   ```text
   - Practice Set 1 | course-files/course-real-analysis-ps1.pdf
   ```

4. In the corresponding HTML `course-*.html` file, set the link to that PDF, for example:

```html
<ul>
  <li><a href="course-real-analysis-ps1.pdf">Practice Set 1</a></li>
</ul>
```

If you later rename a PDF, update both the HTML link and the filename shown in `COURSES.txt` so they match.

---

## 5. Recommended workflow for your student helper

When updating courses for a new semester:

1. **Check `COURSES.txt`**  
   - Add new semesters to the relevant course(s).
   - Append new problem sets and suggested PDF names.

2. **Update the course HTML file**  
   - Adjust semester information and syllabus.
   - Add new `<li>` entries under "Practice Problem Sets" with the correct `href` values.

3. **Upload or copy PDFs**  
   - Place the new PDFs in the chosen folder with the agreed names.

4. **Update `teaching.html` if needed**  
   - If a course moves from "Current / Upcoming" to "Past", adjust its position in the lists.

This keeps everything consistent and future-proof, while still being simple enough to edit by hand.
