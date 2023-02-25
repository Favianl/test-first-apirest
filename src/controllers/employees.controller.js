import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee');
    res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusText: 'An error happened',
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length < 1)
      return res.status(404).json({
        statusText: 'Not Found',
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      statusText: 'An error happened',
    });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      'INSERT INTO employee(name, salary) VALUES (?,?)',
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      statusText: 'An error happened',
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  /* //With ,put()
  const [result] = await pool.query(
    'UPDATE employee SET name = ?, salary = ? WHERE id = ?',
    [name, salary, id]
  ); */
  try {
    const [result] = await pool.query(
      'UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        statusText: 'Not Found',
      });

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [
      id,
    ]);

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      statusText: 'An error happened',
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [
      req.params.id,
    ]);

    if (result.affectedRows < 1)
      return res.status(404).json({
        statusText: 'Not Found',
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      statusText: 'An error happened',
    });
  }
};
