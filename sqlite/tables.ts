export const INSTITUTION = `CREATE TABLE IF NOT EXISTS institution (
                            institutionid INTEGER PRIMARY KEY AUTOINCREMENT, 
                            institutionname TEXT NOT NULL, 
                            institutionstartdate TEXT NOT NULL, 
                            institutionenddate TEXT NOT NULL, 
                            institutionicon TEXT NOT NULL, 
                            institutionstatus TEXT NOT NULL, 
                            institutiongpa REAL)`;

export const SESSION = `CREATE TABLE IF NOT EXISTS session (
                        sessionid INTEGER PRIMARY KEY AUTOINCREMENT, 
                        sessioninstitution INTEGER NOT NULL, 
                        sessioninstitutionname TEXT NOT NULL, 
                        sessionname TEXT NOT NULL,
                        sessionstartdate TEXT NOT NULL, 
                        sessionenddate TEXT NOT NULL,  
                        sessionicon TEXT NOT NULL, 
                        sessionstatus TEXT NOT NULL, 
                        sessiongpa REAL, 
                        FOREIGN KEY(sessioninstitution) REFERENCES institution(institutionid),
                        FOREIGN KEY(sessioninstitutionname) REFERENCES institution(institutionname))`;

export const SEMESTER = `CREATE TABLE IF NOT EXISTS semester (
                         semesterid INTEGER PRIMARY KEY AUTOINCREMENT, 
                         semestersession INTEGER NOT NULL,
                         semestersessionname TEXT NOT NULL,
                         semestername TEXT NOT NULL, 
                         semesterstartdate TEXT NOT NULL, 
                         semesterenddate TEXT NOT NULL, 
                         semestericon TEXT NOT NULL, 
                         semesterstatus TEXT NOT NULL, 
                         semestergpa REAL,
                         FOREIGN KEY(semestersession) REFERENCES session(sessionid),
                         FOREIGN KEY(semestersessionname) REFERENCES session(sessionname))`;

export const COURSE = `CREATE TABLE IF NOT EXISTS course (
                       courseid INTEGER PRIMARY KEY AUTOINCREMENT, 
                       coursesemester INTEGER NOT NULL, 
                       coursesemestername TEXT NOT NULL, 
                       coursename TEXT NOT NULL, 
                       courseicon TEXT NOT NULL, 
                       coursestatus TEXT NOT NULL, 
                       coursegpa REAL, 
                       FOREIGN KEY(coursesemester) REFERENCES semester(semesterid),
                       FOREIGN KEY(coursesemestername) REFERENCES semester(semestername))`;