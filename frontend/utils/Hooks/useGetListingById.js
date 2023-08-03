import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import listingApi from "../Api/listing.api";

const useGetListingById = (id) => {
  const [listing, setListing] = useState(undefined);
  const router = useRouter();
  const { isLoading, isFetching } = useQuery({
    queryFn: () => listingApi.getListingById(id),
    queryKey: [`listingDetailById ${id}`],
    onSuccess: (data) => {
      setListing(data.data);
    },
    onError: () => {
      router.push("/404");
    },
  });
  return { listing, isLoading, isFetching };
};

export default useGetListingById;
