import type { Emitter as SocketIOEmitter } from '@socket.io/redis-emitter';
import { type Entry } from 'fast-glob';
import type { Server as SocketIOServer } from 'socket.io';
export declare const WORKSPACE_SOCKET_NAMESPACE = "/workspace";
export declare function init(io: SocketIOServer | SocketIOEmitter): void;
export declare function emitMessageForWorkspace(workspaceId: string | number, event: string, ...args: any[]): void;
/**
 * Updates a workspace's current message.
 *
 * @param id The workspace's id.
 * @param message The workspace's new message.
 * @param toDatabase Whether to write the message to the database.
 */
export declare function updateWorkspaceMessage(workspace_id: string | number, message: string, toDatabase?: boolean): Promise<void>;
/**
 * Updates a workspace's current state and message.
 *
 * @param id The workspace's id.
 * @param state The workspace's new state.
 * @param message The workspace's new message.
 */
export declare function updateWorkspaceState(workspace_id: string | number, state: string, message?: string): Promise<void>;
interface GradedFilesLimits {
    maxFiles: number;
    maxSize: number;
}
export declare function getWorkspaceGradedFiles(workspaceDir: string, gradedFiles: string[], limits: GradedFilesLimits): Promise<Entry[]>;
/**
 * Updates the disk usage of a workspace. This is computed as the sum of the
 * sizes of all versions of the workspace. The result is stored in the
 * `disk_usage_bytes` column of the `workspaces` table. The total size is returned.
 *
 * @param workspace_id The ID of the workspace to update.
 * @param workspacesRoot The root directory of all workspace data.
 */
export declare function updateWorkspaceDiskUsage(workspace_id: string, workspacesRoot: string): Promise<number>;
/**
 * Default options for calls to `fast-glob`.
 */
export declare const workspaceFastGlobDefaultOptions: {
    extglob: boolean;
    braceExpansion: boolean;
};
/**
 * Update the course instance usages for workspace usage.
 *
 * @param param.workspace_id The ID of the workspace.
 * @param param.duration The usage duration (in milliseconds).
 */
export declare function updateCourseInstanceUsagesForWorkspace({ workspace_id, duration_milliseconds, }: {
    workspace_id: string | number;
    duration_milliseconds: number;
}): Promise<void>;
export {};
