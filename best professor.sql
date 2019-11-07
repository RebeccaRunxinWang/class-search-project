SELECT AVG(course_review.teaching_quality) AS t, course_review.professor_email, professor.Email,
professor.name AS name
FROM course_review, professor
WHERE course_review.professor_email  =  professor.Email
GROUP BY course_review.professor_email
ORDER BY t;