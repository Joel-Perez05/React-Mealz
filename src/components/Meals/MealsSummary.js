import React from 'react'
import classes from "./MealsSummary.module.css"

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicous lunch or dinner in the comfort of your own home!
      </p>
      <p>
        All of our meals are cooked with high-quality ingredients, made to order 
        fresh by our experienced master chefs!
      </p>
    </section>
  )
}

export default MealsSummary