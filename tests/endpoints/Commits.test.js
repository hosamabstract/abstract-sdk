// @flow
import {
  mockAPI,
  mockCLI,
  API_CLIENT,
  CLI_CLIENT
} from "../../src/util/testing";

describe("commits", () => {
  describe("info", () => {
    test("api", async () => {
      mockAPI("/projects/project-id/commits/sha", {
        sha: "sha"
      });

      const response = await API_CLIENT.commits.info({
        projectId: "project-id",
        sha: "sha"
      });

      expect(response).toEqual({
        sha: "sha"
      });
    });

    test("api - branch", async () => {
      mockAPI("/projects/project-id/branches/branch-id/commits/sha", {
        sha: "sha"
      });

      const response = await API_CLIENT.commits.info({
        projectId: "project-id",
        branchId: "branch-id",
        sha: "sha"
      });

      expect(response).toEqual({
        sha: "sha"
      });
    });

    test("cli", async () => {
      mockCLI(["commits", "get", "sha", "--project-id=project-id"], {
        commit: {
          id: "commit-id"
        }
      });

      const response = await CLI_CLIENT.commits.info({
        projectId: "project-id",
        branchId: "branch-id",
        sha: "sha"
      });

      expect(response).toEqual({
        id: "commit-id"
      });
    });
  });

  describe("list", () => {
    test("api", async () => {
      mockAPI(
        "/projects/project-id/branches/branch-id/commits?endSha=end-sha&fileId=file-id&layerId=layer-id&limit=10&startSha=start-sha",
        {
          commits: []
        }
      );

      const response = await API_CLIENT.commits.list(
        {
          projectId: "project-id",
          branchId: "branch-id",
          fileId: "file-id",
          layerId: "layer-id"
        },
        {
          limit: 10,
          startSha: "start-sha",
          endSha: "end-sha"
        }
      );

      expect(response).toEqual([]);
    });

    test("cli - without options", async () => {
      mockCLI(
        ["commits", "list", "--project-id=project-id", "--branch-id=branch-id"],
        {
          commits: []
        }
      );

      const response = await CLI_CLIENT.commits.list({
        projectId: "project-id",
        branchId: "branch-id"
      });

      expect(response).toEqual([]);
    });

    test("cli - with options", async () => {
      mockCLI(
        [
          "commits",
          "list",
          "--project-id=project-id",
          "--branch-id=branch-id",
          "--file-id",
          "file-id",
          "--layer-id",
          "layer-id",
          "--start-sha",
          "start-sha",
          "--end-sha",
          "end-sha",
          "--limit",
          "10"
        ],
        {
          commits: []
        }
      );

      const response = await CLI_CLIENT.commits.list(
        ({
          projectId: "project-id",
          branchId: "branch-id",
          layerId: "layer-id",
          fileId: "file-id",
          sha: "sha"
        }: any),
        {
          limit: 10,
          startSha: "start-sha",
          endSha: "end-sha"
        }
      );

      expect(response).toEqual([]);
    });
  });
});
