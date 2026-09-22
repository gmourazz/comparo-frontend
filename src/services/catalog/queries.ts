import type { Machine } from "@/types/machine";
import { fetchMachine, fetchMachines } from "@/lib/api-client";

/**
 * Single read boundary between the frontend and the catalog data source.
 * Nothing in components/features may import the API client directly —
 * everything goes through this module. The data itself lives in the Go
 * backend (see backend/) — see the architecture pivot note in the plan for
 * why this moved off Prisma.
 */

export async function getActiveMachines(): Promise<Machine[]> {
  return fetchMachines("/api/machines");
}

export async function getAllMachines(): Promise<Machine[]> {
  return fetchMachines("/api/machines?all=true");
}

export async function getMachineBySlug(slug: string): Promise<Machine | null> {
  return fetchMachine(`/api/machines/${encodeURIComponent(slug)}`);
}
