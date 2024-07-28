import inquirer from "inquirer";
import chalk from "chalk";

let todos :any= [];
let condition = true;

async function promptUser() {
    const { action } = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add a todo", "Delete a todo", "Exit"]
    });

    if (action === "Add a todo") {
        const { todo } = await inquirer.prompt({
            name: "todo",
            type: "input",
            message: "What would you like to add in your todos?"
        });
        todos.push(todo);
        console.log(chalk.green(`Current Todos: ${todos.join(", ")}`));
    } else if (action === "Delete a todo") {
        if (todos.length === 0) {
            console.log(chalk.red("No todos to delete."));
        } else {
            const { todo } = await inquirer.prompt({
                name: "todo",
                type: "list",
                message: "Which todo would you like to delete?",
                choices: todos
            });
            todos = todos.filter((t: any) => t !== todo);
            console.log(chalk.black(`Deleted todo: ${todo}`));
            console.log(chalk.green(`Current Todos: ${todos.join(", ")}`));
        }
    } else if (action === "Exit") {
        condition = false;
    }
}

while (condition) {
    await promptUser();
}

console.log(chalk.green("Final Todo List:"));
console.log(chalk.green(todos.join(", ")));
