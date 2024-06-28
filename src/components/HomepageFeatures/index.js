import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: 'Teoria',
    link: 'docs/teoria/intro-teoria',
    Svg: require('@site/static/img/closed_Book_Icon.svg').default,
    description: (
      <>
        Información de la parte teórica del curso
      </>
    ),
  },
  {
    title: 'Laboratorio',
    link: 'docs/laboratorio/intro-laboratorio',
    Svg: require('@site/static/img/circle-icons-computer.svg').default,
    description: (
      <>
        Información de la parte práctica del curso
      </>
    ),
  },
];

function Feature({Svg, title, description,link}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Link to={link}>
        <Heading as="h3">{title}</Heading>
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
