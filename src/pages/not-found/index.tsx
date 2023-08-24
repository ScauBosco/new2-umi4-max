import Layout from 'antd/es/layout/layout';
import './index.less';

export default function () {
  return (
    <Layout>
      <div className="not-found-container">
        <h1 className="not-found-title">404 Not Found</h1>
        <p className="not-found-text">
          The page you are looking for does not exist.
        </p>
        <a href="/" className="not-found-link">
          Go back to homepage
        </a>
      </div>
    </Layout>
  );
}
