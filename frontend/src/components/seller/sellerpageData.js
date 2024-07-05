import { ShoppingBagIcon, QueueListIcon, ArrowTrendingUpIcon, ChartBarIcon, CurrencyEuroIcon } from "@heroicons/react/24/solid";
import { ArchiveBoxIcon, DocumentTextIcon, ClipboardDocumentListIcon, DocumentChartBarIcon, CircleStackIcon,MagnifyingGlassCircleIcon,UserGroupIcon,MegaphoneIcon,BanknotesIcon, CreditCardIcon, Cog6ToothIcon, TruckIcon, ReceiptPercentIcon, PlusCircleIcon, TableCellsIcon , LightBulbIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export const data = [
    {
        label: "Products",
        value: "products",
        icon: ShoppingBagIcon,
        items: [
            {
                itemLabel: "Manage Products",
                itemValue: "manageproducts",
                itemIcon: Cog6ToothIcon,
                itemContent: ""
            },
            {
                itemLabel: "Add Products",
                itemValue: "addproducts",
                itemIcon: PlusCircleIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Opportunity Center",
                itemValue: "opportunitycenter",
                itemIcon: LightBulbIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Assortment Growth",
                itemValue: "assortmentgrowth",
                itemIcon: TableCellsIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Fulfillment by Winkel.nl",
                itemValue: "fulfillment",
                itemIcon: ShieldCheckIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Manage Coupons",
                itemValue: "managecoupons",
                itemIcon: ReceiptPercentIcon,
                itemContent: "sample content"
            }
        ]
    },
    {
        label: "Orders",
        value: "orders",
        icon: QueueListIcon,
        items: [
            {
                itemLabel: "For Payment",
                itemValue: "forpayment",
                itemIcon: CreditCardIcon,
                itemContent: "sample"
            },
            {
                itemLabel: "For Packing",
                itemValue: "forpacking",
                itemIcon: ArchiveBoxIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "For Delivery",
                itemValue: "fordelivery",
                itemIcon: TruckIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Delivered",
                itemValue: "delivered",
                itemIcon: ClipboardDocumentCheckIcon,
                itemContent: "sample content"
            }
        ]
    },
    {
        label: "Marketing Center",
        value: "marketingcenter",
        icon: ArrowTrendingUpIcon,
        items: [
            {
                itemLabel: "Promotions",
                itemValue: "promotions",
                itemIcon: MegaphoneIcon,
                itemContent: "sample"
            },
            {
                itemLabel: "Strategies",
                itemValue: "strategies",
                itemIcon: LightBulbIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Social Media Ads",
                itemValue: "socialmediaads",
                itemIcon: UserGroupIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Search Engine Optimization",
                itemValue: "seo",
                itemIcon: MagnifyingGlassCircleIcon,
                itemContent: "sample content"
            }
            
            
        ]
    },
    {
        label: "Data Center",
        value: "datacenter",
        icon: ChartBarIcon,
        items: [
            {
                itemLabel: "Earnings",
                itemValue: "earnings",
                itemIcon: BanknotesIcon,
                itemContent: "sample"
            },
            {
                itemLabel: "Total Profit",
                itemValue: "totalprofit",
                itemIcon: CircleStackIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Financial Reports",
                itemValue: "financialreports",
                itemIcon: DocumentChartBarIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "Receivables",
                itemValue: "receivables",
                itemIcon: DocumentTextIcon,
                itemContent: "sample content"
            },
            {
                itemLabel: "All Product Records",
                itemValue: "productrecords",
                itemIcon: ClipboardDocumentListIcon,
                itemContent: "sample content"
            }
        ]
    },
    {
        label: "Shop Privilege",
        value: "shopprivilege",
        icon: CurrencyEuroIcon,
        items: [
            {
                itemLabel: "Seller Agreement",
                itemValue: "selleragreement",
                itemIcon: DocumentTextIcon,
                itemContent: "sample"
            },
            {
                itemLabel: "Seller Fee Dsicount",
                itemValue: "sellerDiscount",
                itemIcon: ReceiptPercentIcon,
                itemContent: "sample"
            },
            {
                itemLabel: "Parcel Delivery Options",
                itemValue: "parceldeliveryoptions",
                itemIcon: TruckIcon,
                itemContent: "sample content"
            }
        ]
    },
]