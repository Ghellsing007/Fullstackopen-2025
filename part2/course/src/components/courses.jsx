import React from "react"
import data from "../data"

const Courses = () => {

    const total = data.reduce((totalCursos, curso) => {
        const sumaCurso = curso.parts.reduce((totalPartes, parte) => totalPartes + parte.exercises, 0)
        return totalCursos + sumaCurso
    }, 0)

    return (
        <div>
            {data.map(course => (
                <div key={course.id}>
                    <h1>{course.name}</h1>
                    <ul>
                        {course.parts.map(part => (
                            <li key={part.id}>
                                {part.name}: {part.exercises} ejercicios
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <h2>Total de ejercicios: {total}</h2>
        </div>
    )
}

export default Courses
