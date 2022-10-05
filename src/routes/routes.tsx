import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from '../pages/Home';
import Loader from '../components/Loader';
import MyPosts from '../pages/MyPosts';

const BlogRoutes: React.FunctionComponent = () => (
  <div className="d-flex">
    <div className="d-flex flex-column p-0 w-100">
      <main>
        <Container fluid>
          <React.Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/MyPosts" element={<MyPosts />} />
            </Routes>
          </React.Suspense>
        </Container>
      </main>
    </div>
  </div>
);

BlogRoutes.defaultProps = { public: true };

export default BlogRoutes;
