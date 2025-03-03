
//ejercicio 1.3 - 1.5
const App = () => { 

  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  
  ]

  const totalExercises = parts.reduce((sum, { exercises }) => sum + exercises, 0)  
  
  return (
    <>
    <Course a={course} b={parts} c={totalExercises}/>
    </> 
  )
}

const Course = ({a,b,c}) => {
  return (
    
    <>
      <Header course={a} />
      <Content parts={b} />
      <Total s={c}/>  
    </>
    

  )

}

const Part = ({ a, b }) => {
  return (
    <>
      <h2>{a}</h2>
      <p>{b}</p>
    </>
  )
}

const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = (props) => {
  
  return (
    <>
    <Part a={props.parts[0].name} b={props.parts[0].exercises} />
    <Part a={props.parts[1].name} b={props.parts[1].exercises} />
    <Part a={props.parts[2].name} b={props.parts[2].exercises} />      
    </>
  )
}

const Total = ({s}) => {  
  return (
    <p>Number of exercises: {s} </p>
  )
}



export default App


