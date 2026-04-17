import React from 'react'
import { useSearch } from '../context/Search'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'
import { LiaRupeeSignSolid } from "react-icons/lia";


const {Meta} = Card

const Search = () => {
    const [values, setValues] = useSearch()

  return (
    <Layout title={'Search Results'}>
        <div className="h-full w-full text-center">
            <h1>Search Results</h1>
            <h6>{values?.results.length < 1 ? "No search results" : `${values?.results.length} results found`}</h6>
                      <div className=" w-full grid grid-cols-6 p-">
            {values?.results.map((p) => (
              <Link
                key={p._id}
                to={`/product/${values._id}`}
                className="h-full w-full col-span-1 mb-2 "
              >
                <div className="m-5 ">
                  <Card
                    hoverable
                    style={{
                      width: 270,
                      padding: 20,
                      backgroundColor: "rgba(243, 247, 252, 0.37)",
                    }}
                    cover={
                      <img
                        alt={p.name}
                        src={`/api/v1/product/get-photo/${p._id}`}
                      />
                    }
                    actions={[
                      <Button type="ghost">More Details</Button>,
                      <Button type="ghost">Add to Cart</Button>,
                    ]}
                  >
                    <Meta title={p.name} description={p.description} />
                    <p className="flex mt-2">
                      <LiaRupeeSignSolid />
                      {p.price}
                    </p>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
 
        </div>
    </Layout>
)
}

export default Search