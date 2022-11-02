'use strict'

var stdin = process.stdin,
    stdout = process.stdout,
    person = {
    	name: null,
    	age:0
    }

function saveAge(age){
	person.age = age
	if (person.age>=18) {
		stdout.write(person.name + ' es mayor de edad, tiene '+ person.age + ' años\n')
	}else{
		stdout.write(person.name + ' es menor de edad, tiene '+ person.age + ' años\n')
	}

	process.exit()
}

function saveName(name){
	person.name = name
	var question = 'Hola ' + person.name + ' ¿Cuantos años tienes?'
	quiz(question, saveAge)
}

function quiz(question, callback){
	stdin.resume() //permite leer lo que el usuario escriba en el cmd
	stdout.write( question + ': ')

	stdin.once('data',function(res){
		callback(res.toString().trim())
	})

}

stdin.setEncoding('utf8') //todo lo que entre a la consola se codifique en utf-8
quiz('¿Como te llamas?', saveName)