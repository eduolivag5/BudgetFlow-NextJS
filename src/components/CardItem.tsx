import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

interface CardProps {
    cardItem: {
        title: string,
        description: string,
        icon: React.ReactNode,
        link: string
    }
}

export default function CardItem({ cardItem } : CardProps) {
    return (
        <Link className='flex-1' href={cardItem.link}>
            <Card className='p-4 hover:bg-secondary'>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        {cardItem.icon}
                        <h3 className="text-lg font-medium">{cardItem.title}</h3>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="mt-2 text-sm text-gray-500">{cardItem.description}</p>
                </CardBody>
            </Card>
        </Link>
        
    )
}
