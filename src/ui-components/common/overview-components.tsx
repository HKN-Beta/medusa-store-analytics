/*
 * Copyright 2024 RSC-Labs, https://rsoftcon.com/
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from 'react';
import { Text, Switch, Label, DropdownMenu, IconButton, Checkbox, Button } from "@medusajs/ui";
import { EllipsisHorizontal } from "@medusajs/icons"
import { DateRange, OrderStatus } from "../utils/types";

export const ComparedDate = ({compare, comparedToDateRange} : {compare: boolean, comparedToDateRange?: DateRange}) => {
  if (comparedToDateRange && compare) {
    return (
      <Text>
        {`Compared to ${comparedToDateRange.from.toLocaleDateString()} - ${comparedToDateRange.to.toLocaleDateString()}`}
      </Text>
    );
  }
  return (
    <Text>
      {`No comparison`}
    </Text>
  ); 
}

type BooleanCallback = (value: boolean) => any;

export const SwitchComparison = ({compareEnabled, onCheckChange, allTime} : {compareEnabled: boolean, onCheckChange: BooleanCallback, allTime: boolean}) => {
  return (
    <div className="flex items-center gap-x-2">
      <Switch id="manage-inventory" onCheckedChange={onCheckChange} disabled={allTime} checked={compareEnabled && !allTime}/>
      <Label htmlFor="manage-inventory">Compare</Label>
    </div>
  )
}

type OrderStatusCallback = (value: OrderStatus[]) => any;

export const DropdownOrderStatus = ({onOrderStatusChange, appliedStatuses} : {onOrderStatusChange: OrderStatusCallback, appliedStatuses: OrderStatus[]}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prevSelectedStatuses) =>
      prevSelectedStatuses.includes(status)
        ? prevSelectedStatuses.filter((selected) => selected !== status)
        : [...prevSelectedStatuses, status]
    );
  };


  const handleApplyClick = () => {
    // Close the dropdown when Apply is clicked
    setIsDropdownOpen(false);
    onOrderStatusChange(selectedStatuses.map(selectedStatus => OrderStatus[selectedStatus.toUpperCase()]));
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={(isOpen) => {
      if (isOpen) {
        setSelectedStatuses(Object.values(appliedStatuses));
      }
      setIsDropdownOpen(isOpen)
    }}>
    <DropdownMenu.Trigger asChild>
      <IconButton>
        <EllipsisHorizontal />
      </IconButton>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      {Object.values(OrderStatus).map(orderStatus => (
        <DropdownMenu.Item className="gap-x-2" onSelect={event => event.preventDefault()}>
          <Checkbox 
            id={`order-status-${orderStatus}`}
            checked={selectedStatuses.includes(orderStatus)}
            onCheckedChange={() => handleStatusToggle(orderStatus)}
          />
          <Label htmlFor={`order-status-${orderStatus}`}>{orderStatus}</Label>
        </DropdownMenu.Item>
      ))}
      <DropdownMenu.Label className="gap-x-2">
          <Button onClick={handleApplyClick}>
            Apply
          </Button>
      </DropdownMenu.Label>
    </DropdownMenu.Content> 
    </DropdownMenu>
  )
}