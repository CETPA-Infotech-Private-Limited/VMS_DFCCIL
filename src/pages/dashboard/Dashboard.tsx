import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col px-4">
      <div className="flex h-16 items-center justify-between  px-4">
        <Heading type={4}>Dashboard</Heading>
        <Button variant="default">Add Visitor</Button>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">124</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Today's Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <div>
          <h2 className="mb-4 text-lg font-bold">Visitor Log</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Check-in Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>10:00 AM</TableCell>
                <TableCell>Approved</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>11:30 AM</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm">
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
