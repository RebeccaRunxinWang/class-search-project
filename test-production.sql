/* sort by difficulting */
Select * from course 
Order by average_difficulty;


/* search by attributes */
select * from course 
where department = 'Computer Science';


/* filter by average teaching quality */
Select * from course where average_teaching_quality > 4;


/* search by when the class was taken */
select * from course_review where semester = 'Fall 2019';