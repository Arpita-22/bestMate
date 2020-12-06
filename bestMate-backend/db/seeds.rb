# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

FoodRestaurant.destroy_all
AllowedFood.destroy_all
Note.destroy_all
Relative.destroy_all
Restaurant.destroy_all
User.destroy_all
QuestionAnswer.destroy_all

u1 = User.create(name: "Anita", address: "Seattle", age: 60, password: "Anita@60" )

re1 = Relative.create(name: "Dan", address: "California", age: 45, relationship: "cousin", distance: 2, user_id: u1.id)
re2 = Relative.create(name: "Brown", address: "Denver", age: 75, relationship: "husband", distance: 1, user_id: u1.id)
re3 = Relative.create(name: "James", address: "Seattle", age: 15, relationship: "grandson", distance: 1 , user_id: u1.id)
re4 = Relative.create(name: "Jo", address: "Seattle", age: 65, relationship: "friend", distance: 2, user_id: u1.id)

n1 = Note.create(description: "We met 40 years ago", relative_id: re2.id)
n2 = Note.create(description: "I watched him grow up ", relative_id: re3.id)
n3 = Note.create(description: "she helped me get back on my feet", relative_id: re4.id)
n4 = Note.create(description: "He had always been very supportive", relative_id: re1.id)

af1 = AllowedFood.create(name: "pasta", user_id: u1.id)
af2 = AllowedFood.create(name: "green vegetables", user_id: u1.id)
af3 = AllowedFood.create(name: "cheese", user_id: u1.id)
af4 = AllowedFood.create(name: "soup", user_id: u1.id)

ra1 = Restaurant.create(name: "pasta place" , address: "seattle")
ra2 = Restaurant.create(name: "soup and salad house" , address: "seattle")
ra3 = Restaurant.create(name: "My eatery" , address: "Seattle")

fr1 = FoodRestaurant.create(allowed_food_id: af1.id, restaurant_id: ra1.id)
fr2 = FoodRestaurant.create(allowed_food_id: af2.id , restaurant_id: ra2.id)
fr3 = FoodRestaurant.create(allowed_food_id: af4.id, restaurant_id: ra2.id)
fr4 = FoodRestaurant.create(allowed_food_id: af3.id, restaurant_id: ra3.id)

qa1 = QuestionAnswer.create(question: "how are you?", answer:"I am good")
qa2 = QuestionAnswer.create(question: "How is the weather today?", answer:"The weather is good")
qa3 = QuestionAnswer.create(question: "Hello?", answer:"Hi")


