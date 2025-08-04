# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


ROUTES:
For not logged in person:

Index: src/web/views/Home.jsx
    Nav:
        Home: Default page
            Get Started: src/web/components/SignUp/SignUp.jsx
            Become a Student: src/web/components/SignUp/SignUp.jsx

        Courses: src/web/components/SelectCategory/categoryselectionpage
            Academic continue butt: src/web/components/SelectCLasses/selectclasses.jsx
                classes button: src/web/components/AcademicSubjectSelection/SubjectSelectionPage.jsx
                    see detail: src/components/SubjectDetailsPage/subjectDetails.jsx

        About: src/web/components/AboutUS/AboutUs.jsx
        ContactUs: src/web/components/ContactUs/ContactUs.jsx
        Login: src/web/views/Login.jsx
        Register: src/web/components/SignUp/SignUp.jsx

        For Login Person:
        Dashboard: 
    

