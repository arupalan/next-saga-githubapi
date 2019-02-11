import Head from 'next/head';

const Layout = (props) => (
  <div>
    <Head>
      <title>Github Search Issues</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css"/>
      <link rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
      <link href="/static/styles.css" rel="stylesheet" />
    </Head>
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;

