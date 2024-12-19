import React from 'react'
import Layout from './layout/Layout'

const CategorySpinner = () => {
  return (
    <Layout>
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </Layout>

  )
}

export default CategorySpinner