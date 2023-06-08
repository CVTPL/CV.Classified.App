import * as React from 'react';
import styles from './CvClassified.module.scss';
import { ICvClassifiedProps } from './ICvClassifiedProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CvClassified extends React.Component<ICvClassifiedProps, {}> {
  public render(): React.ReactElement<ICvClassifiedProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.cvClassified} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
        </div>
      </section>
    );
  }
}
