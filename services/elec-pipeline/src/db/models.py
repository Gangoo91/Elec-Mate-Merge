"""Pydantic models for pipeline data validation."""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, HttpUrl


class Product(BaseModel):
    supplier_id: str
    sku: str
    name: str
    brand: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    product_type: str = "material"  # material | tool | accessory | ppe
    current_price: Optional[float] = None
    regular_price: Optional[float] = None
    is_on_sale: bool = False
    discount_percentage: Optional[float] = None
    description: Optional[str] = None
    highlights: Optional[list[str]] = None
    image_url: Optional[str] = None
    product_url: str
    stock_status: str = "unknown"


class Job(BaseModel):
    title: str
    company: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    employment_type: Optional[str] = None
    description: Optional[str] = None
    apply_url: Optional[str] = None
    date_posted: Optional[str] = None
    source: str
    external_id: Optional[str] = None


class Course(BaseModel):
    title: str
    provider: Optional[str] = None
    qualification: Optional[str] = None
    location: Optional[str] = None
    dates: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    entry_requirements: Optional[str] = None
    url: Optional[str] = None
    source: str


class NewsArticle(BaseModel):
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    category: str = "general"
    source: str
    source_url: Optional[str] = None
    external_id: Optional[str] = None
    date_published: Optional[str] = None
    tags: Optional[list[str]] = None


class Deal(BaseModel):
    supplier_id: str
    product_id: Optional[str] = None
    deal_type: str = "weekly_deal"
    original_price: Optional[float] = None
    deal_price: Optional[float] = None
    discount_percentage: Optional[float] = None
    title: Optional[str] = None
    description: Optional[str] = None
    expires_at: str
    source_url: Optional[str] = None
    is_active: bool = True


class Coupon(BaseModel):
    supplier_id: str
    code: str
    description: Optional[str] = None
    discount_type: Optional[str] = None
    discount_value: Optional[float] = None
    minimum_spend: Optional[float] = None
    valid_until: Optional[str] = None
    source_url: Optional[str] = None
