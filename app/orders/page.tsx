import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SectionTitle from "@/components/global/Sectiontitle";
import { fetchUserOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";
import "./orders.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EProductDownloadLinksButton from "@/components/eproducts/EProductDownloadLinksButton";

async function OrdersPage() {
  const orders = await fetchUserOrders();
  console.log(orders,'333333333333');
  

  return (
    <>
      <div className="flex justify-center pb-5">
        <img
          src={"/images/orders.png"}
          style={{ height: "110px" }}
          className="pt-5"
        />
      </div>
      <div>
        <Table className="table">
          <TableCaption>Total orders : {orders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Total Products</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Total</TableHead>
              {/* <TableHead>Tax</TableHead>
              <TableHead>Shipping</TableHead> */}
              <TableHead>Date</TableHead>
              <TableHead>Download Links</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const {
                id,
                products,
                orderTotal,
                // tax,
                // shipping,
                createdAt,
              } = order;

              return (
                <TableRow key={order.id}>
                  <TableCell>{products}</TableCell>
                  <TableCell>
                    <Button variant="link">
                      <Link href={`/orders/${id}`}>{id}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  {/* <TableCell>{formatCurrency(tax)}</TableCell>
                  <TableCell>{formatCurrency(shipping)}</TableCell> */}
                  <TableCell>{formatDate(createdAt)}</TableCell>
                  <TableCell>
                    <EProductDownloadLinksButton orderId={id}></EProductDownloadLinksButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
export default OrdersPage;
