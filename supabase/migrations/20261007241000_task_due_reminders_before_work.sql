-- ELE-2007 follow-up: due-today task reminders ran with the 08:15 UTC expiry
-- job (09:15 in summer), after most crews are on site. Give them their own
-- job at 05:45 UTC (06:45 BST / 05:45 GMT) and put job 147 back to expiries.
select cron.alter_job(147, command := 'select public.notify_compliance_expiries();');
select cron.schedule('employer-task-due-reminders', '45 5 * * *',
                     'select public.notify_task_due_reminders();');
