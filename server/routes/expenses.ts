import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().min(1).max(1000),
  title: z.string().min(1).max(100),
  amount: z.number().min(1).max(1000),
});
type Expense = z.infer<typeof expenseSchema>;
const createExpenseSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Expense 1",
    amount: 100,
  },
  {
    id: 2,
    title: "Expense 2",
    amount: 200,
  },
  {
    id: 3,
    title: "Expense 3",
    amount: 300,
  },
  {
    id: 4,
    title: "Expense 4",
    amount: 400,
  },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      message: "Hello World this is expenses api",
      expenses: fakeExpenses,
    });
  })
  .get("/total-spent", (c) => {
    const totalSpent = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    console.log(expense);
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    fakeExpenses.splice(fakeExpenses.indexOf(expense), 1);
    return c.json({ message: "Expense deleted successfully" });
  });
