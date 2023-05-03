import React from 'react';
import styles from './employee.module.scss';

const Employee = ({ firstName, lastName, email, phoneNumber, picture }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={picture}
          alt='randomly generated image of an employee'
        />
        <div className={styles.name}>{firstName}</div>
        <div className={styles.name}>{lastName}</div>
        <div className={styles.name}>{email}</div>
        <div className={styles.name}>{phoneNumber}</div>
      </div>
    </div>
  );
};

export default Employee;
