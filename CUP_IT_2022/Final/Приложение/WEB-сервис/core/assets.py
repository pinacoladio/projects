from sqlalchemy.sql import text

lossForAllSubdivisionsQuery = text(
    """SELECT first_sub.subdivision_txt, round(CASE WHEN sum(hours_loss) = 0 THEN 0 ELSE CASE
WHEN :service = 'MS Office 365' THEN 0.07*6311658.68
WHEN :service = 'MS Outlook' THEN 0.03*6311658.68
WHEN :service = 'Консультант +' THEN 0.03*6311658.68
WHEN :service = 'АСУ Закупки' THEN 0.03*6311658.68
WHEN :service = 'АСУ Продажи' THEN 0.03*6311658.68
WHEN :service = 'Сервис аналитики' THEN 0.03*6311658.68
ELSE 0.03*6311658.68
END + sum(money_for_position)/sum(hours_loss) * :input_hours END) as money_loss
FROM(
SELECT employee.subdivision_txt,sum(working_hours) as hours_loss,round(service.persent_use_in_work_time*SUM(employee.salary)/100) as money_for_position
FROM work_time
INNER JOIN employee ON employee.employee = work_time.employee
AND employee.subdivision_salary = work_time.subdivision_work
AND EXTRACT(MONTH FROM employee.month) = EXTRACT(MONTH FROM work_time.date)
INNER JOIN service ON employee.position = service.position
AND employee.subdivision_salary = service.subdivision_work
WHERE (work_time.date BETWEEN :date_from and :date_to) AND (service.service_txt = :service)
GROUP BY employee.subdivision_txt, employee.position, service.persent_use_in_work_time
) as first_sub
GROUP BY first_sub.subdivision_txt
ORDER BY 2 DESC;""")
